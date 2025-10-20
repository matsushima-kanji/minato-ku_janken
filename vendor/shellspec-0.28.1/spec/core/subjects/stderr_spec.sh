#shellcheck shell=sh

Describe "core/subjects/stderr.sh"
  BeforeRun set_stderr subject_mock

  Describe "stderr subject"
    Example 'example'
      foo() { echo "foo" >&2; }
      When call foo
      The stderr should equal "foo"
      The error should equal "foo" # alias for stderr
    End

    It 'uses stderr as subject when stderr is defined'
      stderr() { echo "test"; }
      preserve() { %preserve SHELLSPEC_META:META; }
      AfterRun preserve

      When run shellspec_subject_stderr _modifier_
      The entire stdout should equal 'test'
      The variable META should eq 'text'
    End

    It 'uses undefined as subject when stderr is undefined'
      stderr() { false; }
      When run shellspec_subject_stderr _modifier_
      The status should be failure
    End

    It 'outputs error if next word is missing'
      stderr() { echo "test"; }
      When run shellspec_subject_stderr
      The entire stderr should equal SYNTAX_ERROR_DISPATCH_FAILED
    End
  End

  Describe "entire stderr subject"
    Example 'example'
      foo() { echo "foo" >&2; }
      When call foo
      The entire stderr should equal "foo${IFS%?}"
      The entire error should equal "foo${IFS%?}"
    End

    It 'uses stderr including last LF as subject when stderr is defined'
      stderr() { echo "test"; }
      preserve() { %preserve SHELLSPEC_META:META; }
      AfterRun preserve

      When run shellspec_subject_entire_stderr _modifier_
      The entire stdout should equal "test${IFS%?}"
      The variable META should eq 'text'
    End

    It 'uses undefined as subject when stderr is undefined'
      stderr() { false; }
      When run shellspec_subject_entire_stderr _modifier_
      The status should be failure
    End

    It 'outputs error if next word is missing'
      stderr() { echo "test"; }
      When run shellspec_subject_entire_stderr
      The entire stderr should equal SYNTAX_ERROR_DISPATCH_FAILED
    End
  End
End
