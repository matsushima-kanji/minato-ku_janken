# shellcheck shell=sh

# Load the Speckit helper functions that ship with the npm package.
# The helpers provide `speckit_find_*` utilities that specs can reuse.
SPECKIT_LIB_DIR="${SHELLSPEC_PROJECT_ROOT%/}/node_modules/speckit/spec/lib"
. "${SPECKIT_LIB_DIR}/speckit.sh"
