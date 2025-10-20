#shellcheck shell=sh

hook() { %logger "$1 $2 ${SHELLSPEC_EXAMPLE_ID}"; }

Describe '1'
  Before "hook before 1" "hook before 2"
  After "hook after 1" "hook after 2"

  Describe '1-1'
    Before "hook before 3"
    After "hook after 3"

    # The before hook is called by defined order
    %logger "==== before example 1-1-1 ===="
    Example '1-1-1'
      %logger "example ${SHELLSPEC_EXAMPLE_ID}"
      When call :
    End
    %logger "==== after example 1-1-1 ===="
    # The after hook is called by defined reverse order

    # The before hook is called for each example
    %logger "==== before example 1-1-2 ===="
    Example '1-1-2'
      %logger "example ${SHELLSPEC_EXAMPLE_ID}"
      When call :
    End
    %logger "==== after example 1-1-2 ===="
    # The after hook is called for each example
  End

  Describe '1-2'
    # The before 3 hook is not called
    %logger "==== before example 1-2-1 ===="
    Example '1-2-1'
      %logger "example ${SHELLSPEC_EXAMPLE_ID}"
      When call :
    End
    %logger "==== after example 1-2-1 ===="
    # The after 3 hook is not called
  End
End
