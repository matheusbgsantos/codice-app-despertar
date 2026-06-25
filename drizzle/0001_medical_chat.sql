CREATE TABLE `authorized_emails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` text,
	`saleId` varchar(64),
	`productName` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`addedBy` enum('webhook','manual') NOT NULL DEFAULT 'manual',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `authorized_emails_id` PRIMARY KEY(`id`),
	CONSTRAINT `authorized_emails_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `webhook_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`event` varchar(64) NOT NULL,
	`payload` text,
	`customerEmail` varchar(320),
	`saleId` varchar(64),
	`processed` boolean NOT NULL DEFAULT false,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webhook_logs_id` PRIMARY KEY(`id`)
);
