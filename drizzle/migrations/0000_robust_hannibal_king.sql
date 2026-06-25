CREATE TABLE `authorized_emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`saleId` text,
	`productName` text,
	`isActive` integer DEFAULT true NOT NULL,
	`addedBy` text DEFAULT 'manual' NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authorized_emails_email_unique` ON `authorized_emails` (`email`);--> statement-breakpoint
CREATE TABLE `frequency_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`frequencyId` text NOT NULL,
	`mode` text NOT NULL,
	`durationSeconds` integer DEFAULT 0 NOT NULL,
	`startedAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `journey_day_completions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`journeyId` text NOT NULL,
	`dayNumber` integer NOT NULL,
	`frequencyId` text NOT NULL,
	`completedAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`activeJourneyId` text,
	`currentDay` integer DEFAULT 1 NOT NULL,
	`streakCount` integer DEFAULT 0 NOT NULL,
	`lastSessionDate` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_progress_email_unique` ON `user_progress` (`email`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`openId` text NOT NULL,
	`name` text,
	`email` text,
	`loginMethod` text,
	`role` text DEFAULT 'user' NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`lastSignedIn` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_openId_unique` ON `users` (`openId`);--> statement-breakpoint
CREATE TABLE `visitors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`accessCount` integer DEFAULT 1 NOT NULL,
	`lastAccessAt` integer DEFAULT (unixepoch()) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `visitors_email_unique` ON `visitors` (`email`);--> statement-breakpoint
CREATE TABLE `webhook_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event` text NOT NULL,
	`payload` text,
	`customerEmail` text,
	`saleId` text,
	`processed` integer DEFAULT false NOT NULL,
	`errorMessage` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
