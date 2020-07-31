import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	try {
		const queryLeader = req.query.leader as string;

		const foundLeader = (await mongoClient.db('civ-db').collection<Leader>('leaders').find().toArray()).find(
			(leader) => leader.name === queryLeader || leader.name.includes(queryLeader)
		);

		if (foundLeader) {
			res.status(200).json(foundLeader);
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
