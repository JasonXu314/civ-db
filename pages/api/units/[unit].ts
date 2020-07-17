import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	try {
		const queryUnit = req.query.unit as string;

		const foundUnit = (
			await mongoClient
				.db('civ-db')
				.collection<Unit>('units')
				.find({}, { projection: { _id: false } })
				.toArray()
		).find((unit) => unit.name === queryUnit || unit.name.includes(queryUnit));

		if (foundUnit) {
			res.status(200).json(foundUnit);
		} else {
			res.status(404).send('No Unit Found');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err.toString());
	} finally {
		mongoClient.close();
	}
};
