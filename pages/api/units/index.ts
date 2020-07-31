import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<Unit[]>): Promise<void> => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	try {
		const queryUnit = req.query.unit;
		if (queryUnit && queryUnit !== '') {
			if (Array.isArray(queryUnit)) {
				res.status(200).json(
					(await mongoClient.db('civ-db').collection<Unit>('units').find().toArray()).filter(
						(unit) => queryUnit.includes(unit.name) || queryUnit.some((qc) => unit.name.toLowerCase().includes(qc.toLowerCase()))
					)
				);
			} else {
				res.status(200).json(
					(await mongoClient.db('civ-db').collection<Unit>('units').find().toArray()).filter(
						(unit) => unit.name.toLowerCase() === queryUnit.toLowerCase() || unit.name.toLowerCase().includes(queryUnit.toLowerCase())
					)
				);
			}
		} else {
			res.status(200).json(await mongoClient.db('civ-db').collection<Unit>('units').find().toArray());
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		mongoClient.close();
	}
};
