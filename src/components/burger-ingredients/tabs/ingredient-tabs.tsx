import React, { memo, useRef, useState } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import styles from "./ingredients-tabs.module.css";
import { Tabs } from "../../constants";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface TabsTypes {
  tabsRef: React.RefObject<HTMLDivElement>;
  active: any;
  onTabClick: (value: string) => void;
}

const IngredientsTabs: React.FC<TabsTypes> = memo(
  ({ tabsRef, active, onTabClick }) => {
    const _tabsRef = tabsRef;

    const [isScrolling, _setIsScrolling] = useState(false);
    const isScrollingRef = useRef(isScrolling);

    const setIsScrolling = (data: boolean) => {
      isScrollingRef.current = data;
      _setIsScrolling(data);
    };

    const scrollIntoViewAsync = async (scrollTo: Element) => {
      setIsScrolling(true);
      scrollIntoView(scrollTo, {
        behavior: "smooth",
        block: "start",
        // @ts-ignore
      }).then(() => {
        setIsScrolling(false);
      });
    };

    const scrollTabIntoView = (value: string) => {
      const { current } = _tabsRef;

      if (current) {
        const [firstTab, secondTab, thirdTab] = [
          current.children[0],
          current.children[1],
          current.children[2],
        ];

        switch (value) {
          case "one":
            scrollIntoViewAsync(firstTab);
            break;

          case "two":
            scrollIntoViewAsync(secondTab);
            break;

          case "three":
            scrollIntoViewAsync(thirdTab);
            break;
        }
      }
    };

    const handleClick = (value: string) => {
      onTabClick(value);
      scrollTabIntoView(value);
    };

    return (
      <div className={`${styles.tabs} mb-10`}>
        {Tabs.map((tab) => (
          <div key={tab._id}>
            <Tab
              value={tab.value}
              active={active === tab.type}
              onClick={handleClick}
            >
              {tab.name}
            </Tab>
          </div>
        ))}
      </div>
    );
  }
);

export { IngredientsTabs };
