import React, { useRef, useEffect, useState } from "react";
import { Timeline, TimelineOptions } from "vis-timeline";
import * as vistimeline from "vis-timeline/esnext";
import * as visdata from "vis-data/esnext";
import "vis-timeline/dist/vis-timeline-graph2d.min.css";

interface Props {
  items: vistimeline.DataItemCollectionType;
  groups: vistimeline.DataGroupCollectionType;
  options?: vistimeline.TimelineOptions;
  rangeChangeHandler?: (props: any) => void;
}

export default function LightTimeline(props: Props) {
  const { items, groups, options, rangeChangeHandler } = props;

  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [timeline, setTimeline] = React.useState<vistimeline.Timeline | null>(
    null
  );

  React.useEffect(() => {
    if (element) {
      const tl = new vistimeline.Timeline(element, []);
      setTimeline(tl);
      return () => tl.destroy();
    }
  }, [element]);

  React.useEffect(() => {
    timeline?.setGroups(groups);
  }, [timeline, groups]);

  React.useEffect(() => {
    timeline?.setItems(items);
  }, [timeline, items]);

  React.useEffect(() => {
    if (options && timeline) {
      timeline.setOptions(options);
    }
  }, [timeline, options]);

  return <div ref={(r) => setElement(r)} />;
}
