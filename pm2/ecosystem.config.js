module.exports = {
    apps : [{
      name: 'Issues-tracker-Next',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 15001', //running on port 15001
      instances: 1,
      watch: false,   
    }]
  };