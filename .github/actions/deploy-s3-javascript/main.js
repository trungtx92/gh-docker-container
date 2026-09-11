const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    const bucket = core.getInput('bucket-name', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // 2) Upload the files to the GCS bucket
    const gcs = `gs://${bucket}`;
    GCP_ACCESS_KEY_ID = process.env.GCP_ACCESS_KEY_ID;
    GCP_SECRET_ACCESS_KEY = process.env.GCP_SECRET_ACCESS_KEY;
    exec.exec(`gsutil -m rsync -r ${distFolder} ${gcs}`);

    core.notice('Hello from deploy-s3-javascript action!');
}

run();