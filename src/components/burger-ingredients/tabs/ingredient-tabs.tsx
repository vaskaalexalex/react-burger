import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import styles from "./ingredients-tabs.module.css";
import { Tabs } from "../../constants";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface TabsTypes {
  tabsRef: React.RefObject<HTMLDivElement>;
}

const IngredientsTabs: React.FC<TabsTypes> = memo(({ tabsRef }) => {
  const _tabsRef = tabsRef;

  const [tabState, setTabState] = useState("one");

  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(isScrolling);

  const scrollIntoViewAsync = async (scrollTo: Element) => {
    setIsScrolling(true);
    scrollIntoView(scrollTo, {
      behavior: "smooth",
      // @ts-ignore
    }).then(() => {
      setIsScrolling(false);
    });
  };

  const scrollTabIntoView = useCallback(
    (value: string) => {
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
    },
    [_tabsRef]
  );

  const catchScroll = useCallback(() => {
    const { current } = _tabsRef;

    if (current && !isScrollingRef.current) {
      const firstTabTop = current.children[0].getBoundingClientRect().top;

      if (firstTabTop > 30 && firstTabTop <= 300) {
        setTabState("one");
      } else if (firstTabTop > -500 && firstTabTop <= 30) {
        setTabState("two");
      } else if (firstTabTop <= -500) {
        setTabState("three");
      }
    }
  }, [_tabsRef]);

  useEffect(() => {
    const { current } = _tabsRef;
    current?.addEventListener("scroll", catchScroll);
    return () => {
      current?.removeEventListener("scroll", catchScroll);
    };
  }, [_tabsRef, catchScroll]);

  const onTabClick = useCallback(
    (value: string) => {
      setTabState(value);
      scrollTabIntoView(value);
    },
    [scrollTabIntoView]
  );

  return (
    <div className={`${styles.tabs} mb-10`}>
      {Tabs.map((tab) => (
        <div key={tab._id}>
          <Tab
            value={tab.value}
            active={tabState === tab.value}
            onClick={onTabClick}
          >
            {tab.name}
          </Tab>
        </div>
      ))}
    </div>
  );
});

export { IngredientsTabs };
