# Piu Piu

Live player list for laser tag and stuff.

Serverless all the way!

# Setup

Configure AWS credentials in `~/.aws/credentials`. Make note of the profile name you use.

# Deployment

Run the following command to deploy everything. Replace the profile name with your own or omit the parameter entirely if your default profile is configured correctly.

```bash
sls deploy --aws-profile your-aws-profile-name
```