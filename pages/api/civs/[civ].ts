import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	try {
		const queryCiv = req.query.civ as string;

		const foundCiv = (await mongoClient.db('civ-db').collection<Civ>('civs').find().toArray()).find(
			(civ) => civ.name === queryCiv || civ.name.includes(queryCiv)
		);

		if (foundCiv) {
			res.status(200).json(foundCiv);
		} else {
			res.status(404).send('No Civ Found');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err.toString());
	} finally {
		mongoClient.close();
	}
};
