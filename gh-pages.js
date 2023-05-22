var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/rmcew/disc-tool', // Update to point to your repository  
        user: {
            name: 'Ross McEwen', // update to use your name
            email: 'ross.mcewen@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)