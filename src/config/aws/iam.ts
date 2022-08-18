import AWS from "aws-sdk";

const sts = new AWS.STS({
  credentials: {
    //@ts-ignore
    accessKeyId: process.env.AWS_USER_KEY,
    //@ts-ignore
    secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION_SQS,
});

export const getCrossAccountCredentials = async () => {
  return new Promise<AWS.SQS.ClientConfiguration>((resolve, reject) => {
    sts.assumeRole({      
      //@ts-ignore
      RoleArn: process.env.AWS_ARN_POLICY,
      RoleSessionName: `be-descriptibe-here-${new Date().getTime()}`,
      DurationSeconds: 900,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          //@ts-ignore
          accessKeyId: data.Credentials.AccessKeyId,
          //@ts-ignore
          secretAccessKey: data.Credentials.SecretAccessKey,
          //@ts-ignore
          sessionToken: data.Credentials.SessionToken,
        });
      }
    });
  });
};