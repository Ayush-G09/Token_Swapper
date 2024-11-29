import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { theme } from "../utils/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { updateMetrics } from "../store/action";

/**
 * RealTimeMetrics Component
 * 
 * This component displays real-time trading metrics (slippage, price impact, fees).
 * Metrics are updated every 2 seconds using a randomized simulation.
 * 
 * Features:
 * - Uses Redux for state management
 * - Dynamically styled based on the current theme (light/dark mode)
 * - Displays metrics with visual indicators for upward or downward trends
 */
const RealTimeMetrics = () => {
  const dispatch = useDispatch();

  // Accessing Redux state
  const mode = useSelector((state: RootState) => state.mode.mode);
  const metrics = useSelector((state: RootState) => state.metrics);

  // Fetch theme styles based on the current mode
  const th = theme(mode);

  useEffect(() => {
    // Set an interval to update metrics every 2 seconds
    const interval = setInterval(() => {
      dispatchUpdateMetrics();
    }, 2000);

    // Cleanup: Clear interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  /**
   * Dispatch new metrics to the Redux store
   * Simulates random values for slippage, price impact, and fees
   */
  const dispatchUpdateMetrics = () => {
    const newSlippage = parseFloat((Math.random() * 0.2).toFixed(2));
    const newPriceImpact = parseFloat((Math.random() * 0.5).toFixed(2));
    const newFees = parseFloat((Math.random() * 0.1).toFixed(2));

    dispatch(
      updateMetrics({
        slippage: newSlippage,
        priceImpact: newPriceImpact,
        fees: newFees,
      })
    );
  };

  return (
    <div className="box-border flex items-center justify-center p-4 w-full lg:w-1/2">
      <div className="flex flex-col box-border py-2 px-4 w-full rounded-md shadow-lg pb-4" style={{backgroundColor: th.secondary}}>
        {/* Component Title */}
        <h3 className="text-xl mb-4 font-bold" style={{ color: th.font }}>
          Real-Time Metrics
        </h3>

        {/* Metrics Container */}
        <div
          className="flex flex-col md:flex-row shadow-lg w-full rounded-md overflow-hidden"
          style={{
            backgroundColor: th.tertiary
          }}
        >
          {/* Metric: Slippage */}
          <MetricItem
            title="Slippage"
            value={`${metrics.slippage}%`}
            icon={faCaretUp}
            iconClass="text-green-400"
            themeFont={th.font}
          />

          {/* Metric: Price Impact */}
          <MetricItem
            title="Price Impact"
            value={`${metrics.priceImpact}%`}
            icon={faCaretUp}
            iconClass="text-green-400"
            themeFont={th.font}
            borderClass="md:border-l-2 md:border-r-2 border-t-2 md:border-t-0 border-b-2 md:border-b-0"
            th={th}
          />

          {/* Metric: Fees */}
          <MetricItem
            title="Fees"
            value={`${metrics.fees}%`}
            icon={faCaretDown}
            iconClass="text-red-400"
            themeFont={th.font}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * MetricItem Component
 * 
 * Renders a single metric item with title, value, and an indicator icon.
 * 
 * Props:
 * - title: The title of the metric (e.g., "Slippage")
 * - value: The value of the metric (e.g., "0.05%")
 * - icon: FontAwesome icon to indicate trend direction
 * - iconClass: Class for the icon's styling
 * - themeFont: Color for the text based on the current theme
 * - borderClass: Additional border styling for the item (optional)
 */
const MetricItem = ({
  title,
  value,
  icon,
  iconClass,
  themeFont,
  th,
  borderClass,
}: {
  title: string;
  value: string;
  icon: IconDefinition;
  iconClass: string;
  themeFont: string;
  th?: {primary: string};
  borderClass?: string;
}) => (
  <div
    className={`flex flex-col gap-4 p-2 w-full md:w-1/3 ${borderClass}`} style={{borderColor: th?.primary}}
  >
    <div className="flex items-center">
      <span className="text-gray-500 text-sm">{title}</span>
      <FontAwesomeIcon icon={icon} className={`${iconClass} ml-auto`} />
    </div>
    <span className="text-lg font-semibold" style={{ color: themeFont }}>
      {value}
    </span>
  </div>
);

export default RealTimeMetrics;
