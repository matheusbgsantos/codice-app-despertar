CREATE TABLE `visitors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` text,
	`accessCount` int NOT NULL DEFAULT 1,
	`lastAccessAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `visitors_id` PRIMARY KEY(`id`),
	CONSTRAINT `visitors_email_unique` UNIQUE(`email`)
);
