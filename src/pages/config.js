const config =
  [
    {
      title: 'Route Cost',
      description: 'Calculate the delivery cost of the given delivery route',
      pullURL: '/api/getRouteCost',
      dimension:{
        route: {
          isRequired: true,
          defaultValue: ''
        }
      }
    },
    {
      title: 'Number of Routes',
      description: 'Calculate the number of possible delivery routes that can be construct by the given conditions',
      pullURL: '/api/getNumberOfRoutes',
      dimension: {
        origin: {
          isRequired: true,
          defaultValue: ''
        },
        endpoint: {
          isRequired: true,
          defaultValue: ''
        },
        maxStop: {
          isRequired: false,
          defaultValue: ''
        },
        maxCost: {
          isRequired: false,
          defaultValue: ''
        },
        noRepeat: {
          isRequired: false,
          defaultValue: true
        }
      }
    },
    {
      title: 'Cheapest Cost',
      description: 'Calculate the cheapest delivery route between two towns',
      pullURL: '/api/getCheapestCost',
      dimension:{
        origin: {
          isRequired: true,
          defaultValue: ''
        },
        endpoint: {
          isRequired: true,
          defaultValue: ''
        }
      }
    }
  ]

export default config;
