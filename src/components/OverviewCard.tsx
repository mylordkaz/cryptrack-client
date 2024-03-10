import './OverviewCard.css';

interface OverviewCardProps {
  totalValue: number;
}

export default function OverviewCard({ totalValue }: OverviewCardProps) {
  return (
    <>
      <div className="overview">
        <div className="card">
          <span>${totalValue.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}
