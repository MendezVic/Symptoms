const ApiMedicApi =
  process.env.NODE_ENV === 'development'
    ? {
        authUrl: 'https://sandbox-authservice.priaid.ch',
        healthUrl: 'https://sandbox-healthservice.priaid.ch',
        username: process.env.APIMEDIC_SANDBOX_USER,
        password: process.env.APIMEDIC_SANDBOX_PASSWORD,
      }
    : {
        authUrl: 'https://authservice.priaid.ch',
        healthUrl: 'https://healthservice.priaid.ch',
        username: process.env.APIMEDIC_USER,
        password: process.env.APIMEDIC_PASSWORD,
      };

export default ApiMedicApi;
