#shellcheck shell=sh

Describe "libexec/binary.sh"
  Include "$SHELLSPEC_LIB/libexec/binary.sh"

  Describe 'od_command()'
    od() { echo "od"; }
    hexdump() { echo "hexdump"; }

    Context "when od command available"
      It 'calls od command'
        When call od_command
        The stdout should eq 'od'
      End
    End

    Context "when od command not available"
      od() { echo "od: command not found" >&2; return 127; }
      It 'calls hexdump command'
        When call od_command
        The stdout should eq 'hexdump'
      End
    End

    Context "when tod command does not support -t option"
      od() {
        [ "$1" = "-t" ] && return 1
        echo "od" "$@"
      }
      It 'calls od command with -b option '
        When call od_command
        The stdout should eq 'od -b -v'
      End
    End
  End

  Describe 'octal_dump()'
    od() { @od "$@"; }
    hexdump() { @hexdump "$@"; }

    It 'outputs as octal number'
      Data "abc"
      When call octal_dump
      The line 1 of stdout should eq '141'
      The line 2 of stdout should eq '142'
      The line 3 of stdout should eq '143'
      The line 4 of stdout should eq '012'
    End
  End
End
