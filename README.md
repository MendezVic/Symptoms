# Symptoms

This is API consuming ApiMedic API saving user history with their diagnosis and confirmation

## Run the app locally

1. First, fork the repo.

2. Clone the repo and get inside it.

```bash
$ git clone git@github.com:USERNAME/Symptoms.gits
$ cd Symptoms
```

1 Start docker containers to create database and app instance

```bash
$ docker-compose up -d
```

Wait until app has started at [http://localhost:3000](http://localhost:3000).

## Backend API Documentacion

```http
POST /api/auth/signup
```

Signup for using the api

### Body

```javascript
{
    email: string,
    password: string,
    fullName: string,
    gender: male | female,
    dateOfBirth: YYYY-MM-DD
}
```

### Response

```javascript
{
    message: string,
    token: string
}
```

```http
POST /api/auth/login
```

Login to use the API

### Body

```javascript
{
    email: string,
    password: string,
}
```

### Response

```javascript
{
    message: string,
    token: string
}
```

```http
GET /api/apimedic/symptoms
```

Get all the symptoms or only some by sending a ids array in the query params

| Query Param | Type       | Mandatory  |
| :---------- | :--------- | :--------- |
| `symptoms`  | `number[]` | `OPTIONAL` |

### Response

```javascript
[
  {
    ID: number,
    Name: string,
  },
];
```

```http
GET /api/apimedic/diagnosis
```

Get a diagnosis based on one or more symptoms

| Query Param | Type       | Mandatory   |
| :---------- | :--------- | :---------- |
| `symptoms`  | `number[]` | `MANDATORY` |

### Response

```javascript
[
  {
    confirmed: number,
    id: number,
    user_id: number,
    symptoms: string,
    diagnosis: {
      Issue: {
        ID: number,
        Name: string,
        Accuracy: number,
        Icd: string,
        IcdName: string,
        ProfName: string,
        Ranking: number
      },
      Specialisation: [
        {
        ID: number,
        Name: string,
        SpecialistID: number
        }
      ]
    }
    updatedAt: datetime,
    createdAt: datetime
  }
]
```

```http
GET /api/userhistory/
```

Get all the diagnosis history for the user currently logged in

### Response

```javascript
[
  {
    confirmed: number,
    id: number,
    user_id: number,
    symptoms: string,
    diagnosis: {
      Issue: {
        ID: number,
        Name: string,
        Accuracy: number,
        Icd: string,
        IcdName: string,
        ProfName: string,
        Ranking: number
      },
      Specialisation: [
        {
          ID: number,
          Name: string,
          SpecialistID: number
        }
      ]
    }
    updatedAt: datetime,
    createdAt: datetime
  }
]
```

```http
POST /api/userhistory/confirm/:id
```

Confirm a previous diagnosis from the history

| Parameter | Type     | Mandatory   |
| :-------- | :------- | :---------- |
| `id`      | `number` | `MANDATORY` |

### Response

```javascript
[
  {
    confirmed: number,
    id: number,
    user_id: number,
    symptoms: string,
    diagnosis: {
      Issue: {
        ID: number,
        Name: string,
        Accuracy: number,
        Icd: string,
        IcdName: string,
        ProfName: string,
        Ranking: number
      },
      Specialisation: [
        {
          ID: number,
          Name: string,
          SpecialistID: number
        }
      ]
    }
    updatedAt: datetime,
    createdAt: datetime
  }
]
```
