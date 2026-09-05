import core from '@actions/core';
import github from '@actions/github';
import exec from '@actions/exec';

function run() {
    core.notice('hello from the action...');
}

run();