import { observer } from "mobx-react";
import { useEffect, useRef, useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { ItemsStoreContext } from "./store";
import { Link } from "react-router-dom";
import { Item, ItemTimes } from "./2FactorAuthProps";
import { observable } from "mobx";

const TwoFactorAuth = observer(() => {
  const itemsStore = useContext(ItemsStoreContext);

  const circleRefs = useRef<SVGCircleElement[]>([]);
  const [seconds, setSeconds] = useState(60);

  const [itemTimes, setItemTimes] = useState<ItemTimes>({});

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  const getCircleStrokeDashoffset = (seconds: number): number => {
    const remainingTime = seconds % 60;
    const percent = remainingTime / 60;
    const strokeDashoffset = circumference * percent;
    return isNaN(strokeDashoffset) ? 0 : strokeDashoffset;
  };

  const resetCode = (item: Item) => {
    itemsStore.resetCode(item);
    const newItemTimes: ItemTimes = { ...itemTimes };
    newItemTimes[item.id] = 60;
    setItemTimes(newItemTimes);
  };

  const calculateTimerProgress = (timer: number) => {
    const totalTime = 60;
    const remainingTime = Math.max(0, timer);
    const timePercentage = (remainingTime / totalTime) * 100;
    const dashoffset = ((100 - timePercentage) / 100) * (Math.PI * 2 * 22);
    return dashoffset;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      itemsStore.setItemTimes((prevItemTimes) => {
        const newItemTimes = observable.map(prevItemTimes);
        itemsStore.items.forEach((item) => {
          const remainingTime = newItemTimes.get(item.id) || 60;
          if (remainingTime > 0) {
            newItemTimes.set(item.id, remainingTime - 1);
            if (remainingTime === 1) {
              itemsStore.resetCodeAndTimer(item);
            }
          }
        });
        return newItemTimes;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [itemsStore]);

  useEffect(() => {
    if (seconds === 0) {
      // reset the code and start the countdown again
      resetCode(itemsStore.items[0]);
      setSeconds(60);
    }
  }, [seconds, resetCode, itemsStore.items]);

  useEffect(() => {
    circleRefs.current = circleRefs.current.slice(0, itemsStore.items.length);
  }, [itemsStore.items.length]);

  // Update the strokeDashoffset attribute of the circle every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      circleRefs.current.forEach((circleRef, index) => {
        if (circleRef) {
          circleRef.setAttribute(
            "stroke-dashoffset",
            String(getCircleStrokeDashoffset(seconds))
          );
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <div className="two-factor-auth">
      <h1>2FA Code</h1>
      {itemsStore.items.map((item, index) => (
        <div className="code-container" key={item.id}>
          <h4>{item.name}</h4>
          <p className="code">{item.code}</p>
          <FaLock onClick={() => itemsStore.resetCodeAndTimer(item)} />
          <svg className="circle" width="48" height="48" viewBox="0 0 48 48">
            <circle
              ref={(el) => {
                if (el) circleRefs.current[index] = el;
              }}
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="4"
              stroke="#e6e6e6"
            />
            <circle
              className="circle-progress"
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="4"
              stroke="#ff6b6b"
              strokeLinecap="round"
              strokeDasharray="138.23"
              strokeDashoffset={
                itemTimes && itemTimes[item.id]
                  ? calculateTimerProgress(itemTimes[item.id])
                  : 0
              }
            />
          </svg>
        </div>
      ))}
      <Link to="/about">
        <button>Add New Code</button>
      </Link>
    </div>
  );
});

export default TwoFactorAuth;
