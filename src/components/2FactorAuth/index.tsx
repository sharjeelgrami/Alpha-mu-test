import { observer } from "mobx-react";
import { useEffect, useRef, useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { ItemsStoreContext } from "./store";
import { Link } from "react-router-dom";
import { Item, ItemTimes } from "./2FactorAuthProps";
import { CountdownAnimation } from "./CountdownAnimation";

const TwoFactorAuth = observer(() => {
  const itemsStore = useContext(ItemsStoreContext);

  const circleRefs = useRef<SVGCircleElement[]>([]);
  const [seconds, setSeconds] = useState(60);

  const [itemTimes, setItemTimes] = useState<Record<string, number>>({});

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
    setSeconds(60);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItemTimes((prevItemTimes) => {
        const newItemTimes: Record<string, number> = {};
        for (const item of itemsStore.items) {
          const remainingTime = prevItemTimes[item.id] ?? 60;
          if (remainingTime > 0) {
            newItemTimes[item.id] = remainingTime - 1;
            if (remainingTime === 1) {
              itemsStore.resetCodeAndTimer(item);
            }
          }
        }
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
      circleRefs.current.forEach((circleRef) => {
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
      {itemsStore.items.map((item) => (
        <div className="item" key={item.id}>
          <div className="item-details">
            <div className="item-name">{item.name}</div>
            <div className="item-code">{item.code}</div>
          </div>
          <div className="item-actions">
            <FaLock onClick={() => itemsStore.resetCodeAndTimer(item)} />
          </div>
          <CountdownAnimation
            remainingTime={item.itemRemainingTime ?? 60}
            key={item.id}
          />
        </div>
      ))}
      <Link to="/about">
        <button>Add New Code</button>
      </Link>
    </div>
  );
});

export default TwoFactorAuth;
