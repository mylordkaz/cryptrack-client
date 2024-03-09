import './OverviewCard.css';

interface OverviewCardProps {
  totalPortfolioValue: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ totalPortfolioValue }) => {
  return (
    <>
      <div className="overview">
        <div className="card">
          <span>${totalPortfolioValue.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
