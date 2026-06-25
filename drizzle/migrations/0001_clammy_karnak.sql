CREATE TABLE `user_protocol` (
	`email` text PRIMARY KEY NOT NULL,
	`seal` text NOT NULL,
	`dominantChain` text NOT NULL,
	`answersJson` text NOT NULL,
	`protocolJson` text NOT NULL,
	`createdAt` text NOT NULL
);
