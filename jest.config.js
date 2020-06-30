module.exports = {
	roots: ['.'],
	moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
	testPathIgnorePatterns: ['.[/\\\\](node_modules|.next)[/\\\\]'],
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest'
	},
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\$/(.*)': '<rootDir>/components/$1',
		'&/(.*)': '<rootDir>/sass/$1',
		'@/(.*)': '<rootDir>/utils/$1'
	}
};
