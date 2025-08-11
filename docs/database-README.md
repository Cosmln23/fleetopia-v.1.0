# Database Overview

- **YAML schema_version**: NA
- **Multitenant**: no
- **Tables (from Prisma)**: 11
- **Slow query threshold**: NA ms

## Tables & Relations

- `Cargo`
- `ChatMessage`
- `ChatThread`
- `CostSettings`
- `Deal`
- `NotificationSettings`
- `Quote`
- `UserSettings`
- `User`
- `VehicleLocation`
- `Vehicle`

## Foreign Keys (inferred from Prisma relations)

- `Cargo.User` → `User.id`
- `Quote.cargo` → `Cargo.id`
- `Quote.transporter` → `User.id`
- `Deal.cargo` → `Cargo.id`
- `Deal.quote` → `Quote.id`
- `Deal.shipper` → `User.id`
- `Deal.transporter` → `User.id`
- `ChatThread.deal` → `Deal.id`
- `ChatThread.quote` → `Quote.id`
- `ChatMessage.thread` → `ChatThread.id`
- `ChatMessage.sender` → `User.id`
- `Vehicle.owner` → `User.id`
- `Vehicle.driver` → `User.id`
- `Vehicle.currentCargo` → `Cargo.id`
- `VehicleLocation.vehicle` → `Vehicle.id`
- `CostSettings.user` → `User.id`
- `NotificationSettings.user` → `User.id`
- `UserSettings.user` → `User.id`

## Indexes

_No YAML index changes logged yet_

### Indexes (from Prisma schema)

- @@unique on `Vehicle` (ownerId, licensePlate) — `@@unique([ownerId, licensePlate])`

## Security (RLS & Roles)
_No security info yet_


## Data Quality (PII & Retention)
_No PII/retention info_


## Ops (Backups & Replicas)
_No ops info_


## Change Log Index

