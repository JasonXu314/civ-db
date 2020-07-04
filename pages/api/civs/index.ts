import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { Civ } from '/types';

export default async (req: NextApiRequest, res: NextApiResponse<Civ[]>): Promise<void> => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	try {
		const queryCiv = req.query.civ;
		if (queryCiv && queryCiv !== '') {
			if (Array.isArray(queryCiv)) {
				res.status(200).json(
					(await mongoClient.db('civ-db').collection<Civ>('civs').find().toArray()).filter(
						(civ) => queryCiv.includes(civ.name) || queryCiv.some((qc) => civ.name.includes(qc))
					)
				);
			} else {
				res.status(200).json(
					(await mongoClient.db('civ-db').collection<Civ>('civs').find().toArray()).filter((civ) => civ.name === queryCiv || civ.name.includes(queryCiv))
				);
			}
		} else {
			res.status(200).json(await mongoClient.db('civ-db').collection<Civ>('civs').find().toArray());
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		mongoClient.close();
	}
};
