import { MongoClient } from 'mongodb';
import { roughlyEqual } from './utils';

export async function isUniqueUnit(unitName: string): Promise<boolean> {
	console.log(unitName);
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });
	const uniqueUnits = await mongoClient.db('civ-db').collection<UniqueUnit>('unique-units').find().toArray();

	console.log(uniqueUnits.find((unit) => roughlyEqual(unitName, unit.name)));
	return uniqueUnits.some((unit) => roughlyEqual(unitName, unit.name));
}
