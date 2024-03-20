import './OverviewCard.css';

interface OverviewCardProps {
  totalValue: number;
  cryptoName?: string | null;
}

export default function OverviewCard({
  totalValue,
  cryptoName,
}: OverviewCardProps) {
  return (
    <>
      <div className="overview">
        <div className="card">
          <h1>{cryptoName ? cryptoName : 'My portfolio'}</h1>
          <span>${totalValue.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}
