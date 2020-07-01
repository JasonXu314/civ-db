import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { Civ, WithObjectId } from '/types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	try {
		const queryCiv = req.query.civ as string;
		res.status(200).json(
			(await mongoClient.db('civ-db').collection<WithObjectId<Civ>>('civs').find().toArray()).find(
				(civ) => civ.name === queryCiv || civ.name.includes(queryCiv)
			)
		);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		mongoClient.close();
	}
};
