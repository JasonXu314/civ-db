import { isUniqueUnit } from '@/db-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	res.status(200).json({ unique: await isUniqueUnit(req.query.unit as string) });
};
