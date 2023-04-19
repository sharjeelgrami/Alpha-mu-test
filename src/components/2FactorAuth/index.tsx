import { observer } from "mobx-react";
import { useEffect, useRef, useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { ItemsStoreContext } from "./store";
import { Link } from "react-router-dom";
import { Item } from "./2FactorAuthProps";

const TwoFactorAuth = observer(() => {
  const itemsStore = useContext(ItemsStoreContext);

  const circleRefs = useRef<SVGCircleElement[]>([]);
  const [seconds, setSeconds] = useState(60);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  const getCurrentCode = (item: Item) => {
    if (itemsStore.items.length === 0) {
      return null;
    }
    const now = Date.now();
    const codeIndex = Math.floor(now / 1000 / 30) % itemsStore.items.length;
    if (itemsStore.items[codeIndex].name === item.name) {
      return itemsStore.items[codeIndex].code;
    }
    return null;
  };

  const getCircleStrokeDashoffset = (seconds: number): number => {
    const remainingTime = seconds % 60;
    const percent = remainingTime / 60;
    return circumference * percent;
  };

  const resetCode = (item: Item) => {
    itemsStore.resetCode(item);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
        <div className="code-container" key={item.code}>
          <h4>{item.name}</h4>
          <p className="code">{getCurrentCode(item)}</p>
          <FaLock onClick={() => resetCode(item)} />
          <svg className="circle" width="48" height="48" viewBox="0 0 48 48">
            <circle
              ref={(el) => {
                if (el) circleRefs.current[index] = el;
              }}
              cx="24"
              cy="24"
              r={radius}
              stroke="#0d6efd"
              strokeWidth="4"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={getCircleStrokeDashoffset(seconds)}
              fill="none"
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
