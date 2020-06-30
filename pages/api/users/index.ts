import { sampleUserData } from '@/sample-data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	try {
		if (!Array.isArray(sampleUserData)) {
			throw new Error('Cannot find user data');
		}

		res.status(200).json(sampleUserData);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};
