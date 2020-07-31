import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<Leader[]>): Promise<void> => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	try {
		const queryLeader = req.query.leader;
		if (queryLeader && queryLeader !== '') {
			if (Array.isArray(queryLeader)) {
				res.status(200).json(
					(await mongoClient.db('civ-db').collection<Leader>('leaders').find().toArray()).filter(
						(leader) => queryLeader.includes(leader.name) || queryLeader.some((qc) => leader.name.includes(qc))
					)
				);
			} else {
				res.status(200).json(
					(await mongoClient.db('civ-db').collection<Leader>('leaders').find().toArray()).filter(
						(leader) => leader.name === queryLeader || leader.name.includes(queryLeader)
					)
				);
			}
		} else {
			res.status(200).json(await mongoClient.db('civ-db').collection<Leader>('leaders').find().toArray());
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		mongoClient.close();
	}
};
