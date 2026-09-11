const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const os = require('os');
const path = require('path');

async function run() {
    const bucket = core.getInput('bucket-name', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    const serviceAccountKey = process.env.GCP_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
        throw new Error('GCP_SERVICE_ACCOUNT_KEY environment variable is required');
    }

    const keyFilePath = path.join(os.tmpdir(), 'gcp-key.json');
    fs.writeFileSync(keyFilePath, serviceAccountKey);

    // Authenticate gcloud/gsutil using the service account key
    await exec.exec(`gcloud auth activate-service-account --key-file=${keyFilePath}`);

    // Upload the files to the GCS bucket
    const gcs = `gs://${bucket}`;
    await exec.exec(`gsutil -m rsync -r ${distFolder} ${gcs}`);

    core.notice(`Deployed ${distFolder} to ${gcs}`);
}

run().catch((error) => core.setFailed(error.message));
