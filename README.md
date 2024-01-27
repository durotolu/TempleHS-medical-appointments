# TempleHS-medical-appointments
a full-stack application that manages medical appointments. Doctors' and dentists' availability info and patients can sign up, log in, book appointments and manage these appointments on a calendar.

> Make appointments.

> Cascade changes.

## Built with Next, Tailwind and NodeJS

## Install

```sh
cd .\backend\
cd .\frontend\
npm install
```

## Usage

```sh
cd .\backend\
npm install
npm run dev
```

## Usage with docker

```sh
cd .\backend\
docker compose build
docker compose up -d postgres
npx knex migrate:latest
npx knex seed:run 

docker compose up -d backend

docker compose up -d frontend
```

Spins up local servers on port 3000 and 4000



Example:

```sh
Local:     http://localhost:3000
```

## Author

👤 **Modurotolu Olokode**

- Website: [Modurotolu Olokode](https://www.linkedin.com/in/modurotoluolokode/)
- Github: [durotolu](https://github.com/durotolu)