import ResourceIcon from '$/ResourceIcon/ResourceIcon';
import YieldIcon from '$/YieldIcon/YieldIcon';
import styles from './UnitDisplay.module.scss';

interface Props {
	unit: Unit | UniqueUnit;
}

const UnitDisplay: React.FC<Props> = ({ unit }) => {
	return (
		<div className={styles.main}>
			<h1 className={styles.name}>{unit.name}</h1>
			<div className={styles.row}>
				<img src={unit.media.portrait} />
				<img src={unit.media.icon} />
			</div>
			<div className={styles.stats}>
				<h2>Stats</h2>
				<div>
					<h4>Strength:</h4>
					{unit.strength}
				</div>
				{unit.rangedStrength && (
					<div>
						<h4>Ranged Strength:</h4>
						{unit.rangedStrength}
					</div>
				)}
				{unit.bombardStrength && (
					<div>
						<h4>Bombard Strength:</h4>
						{unit.bombardStrength}
					</div>
				)}
				<div>
					<h4>Movement:</h4>
					{unit.movement}
				</div>
				{unit.range && (
					<div>
						<h4>Range:</h4>
						{unit.range}
					</div>
				)}
				<div>
					<h4>Era:</h4>
					{unit.era}
				</div>
				<div>
					<h4>Production Cost:</h4>
					{unit.productionCost} <YieldIcon type="production" />
					{unit.productionResourceCost && ', '}
					{unit.productionResourceCost?.cost} {unit.maintainanceResourceCost && <ResourceIcon type={unit.maintainanceResourceCost.type} />}
				</div>
				<div>
					<h4>Purchase Cost:</h4>
					{unit.purchaseCost} <YieldIcon type="gold" />
				</div>
				<div>
					<h4>Maintainance Cost:</h4>
					{unit.maintainanceCost} <YieldIcon type="gold" />
					{unit.maintainanceResourceCost && ', '}
					{unit.maintainanceResourceCost?.cost} {unit.maintainanceResourceCost && <ResourceIcon type={unit.maintainanceResourceCost.type} />}
				</div>
			</div>
		</div>
	);
};

export default UnitDisplay;
