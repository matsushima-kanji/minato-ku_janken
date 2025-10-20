#!/usr/bin/env sh

eval "$(shellspec -) exit 1"

for inc in "${SHELLSPEC_HELPERDIR}/speckit.sh" "${SHELLSPEC_HELPERDIR}/lib/speckit.sh" "${SHELLSPEC_SPECFILE%/*}/speckit.sh"; do
	[ -z "${SPECKIT_MODULE_LOADED+_}" ] || break

	if [ -f "${inc}" ]; then
		Include "${inc}"
	fi
done

Describe '港区女子マウントじゃんけん Webアプリ' speckit category:web
	Example 'build exports static site'
		When run npm run build
		The status should eq 0
		The stdout should include 'Compiled successfully'
		The stderr should be blank
	End

	Example 'exported page contains 財力 button'
		Skip if 'exported page missing' test ! -f out/index.html
		When run grep -q 財力 out/index.html
		The status should eq 0
	End

	Example 'exported page contains 若さ button'
		Skip if 'exported page missing' test ! -f out/index.html
		When run grep -q 若さ out/index.html
		The status should eq 0
	End

	Example 'exported page contains 人脈 button'
		Skip if 'exported page missing' test ! -f out/index.html
		When run grep -q 人脈 out/index.html
		The status should eq 0
	End

	Example 'character images are available'
		When run sh -c '[ -f public/minatokujosi.png ] && [ -f public/haiboku.png ]'
		The status should eq 0
	End

	Example 'game logic tests describe janken outcomes'
		When run npm run test:logic
		The status should eq 0
		The stdout should include 'Test Files'
		The stderr should include "CJS build of Vite's Node API is deprecated"
	End
End
