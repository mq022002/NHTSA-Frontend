import { Tabs, Tab } from "@mui/material";

const RecallInfoBox = ({ recallItem }) => (
  <div className="border border-gray-300 rounded p-4 my-2">
    <h2 className="text-lg font-semibold">Component: {recallItem.Component}</h2>
    <p className="text-base">Summary: {recallItem.Summary}</p>
    <p className="text-sm">Consequence: {recallItem.Consequence}</p>
    <p className="text-sm">Remedy: {recallItem.Remedy}</p>
  </div>
);

const CarRecalls = ({ recalls, activeRecallTab, handleRecallTabChange }) => (
  <div className="w-1/2 pl-2">
    {recalls.length > 0 ? (
      <>
        <Tabs
          value={activeRecallTab}
          onChange={handleRecallTabChange}
          orientation="vertical"
          variant="scrollable"
          className="overflow-auto"
        >
          {recalls.map((recall, index) => (
            <Tab
              key={index}
              label={<p className="text-xs">{recall.Component}</p>}
            />
          ))}
        </Tabs>
        <div className="pt-3">
          <h2 className="text-lg font-semibold">
            Recall Details for {recalls[activeRecallTab].Component}
          </h2>
          <RecallInfoBox recallItem={recalls[activeRecallTab]} />
        </div>
      </>
    ) : (
      <p>No recall information available.</p>
    )}
  </div>
);

export default CarRecalls;
