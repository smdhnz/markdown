# Github style markdown previewer

## Add to `~/.bashrc`

```bash
function md() {
    if [ $# = 0 ]; then
        command echo "invalid args"
    elif [ ! -e $1 ]; then
        command echo "$1 is not found"
    elif [ "$(cd $(dirname $1); pwd)" = "." ]; then
        command docker run -it --init --rm -p 8000:1234 --volume $(pwd):/app/mnt smdhnz/markdown $1
    else
        command docker run -it --init --rm -p 8000:1234 --volume $(cd $(dirname $1); pwd):/app/mnt smdhnz/markdown $1
    fi
}
```

## Execute

```bash
md [some markdown file]
```

## Go to `localhost:8000` in the browser
