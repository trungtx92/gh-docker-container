const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // 2) Upload the files to the S3 bucket
    const s3Uri = `s3://${bucket}`;
    AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
    AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    core.notice('Hello from deploy-s3-javascript action!');
}

run();