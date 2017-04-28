pidfile = server/tmp/server.pid
gofiles = `find ./server -name \*.go -type f`

all: 
	make clean
	make restart
	 fswatch -0 $(gofiles) | xargs -0 -n 1 -I {} make restart || make kill

kill:
	[ -f $(pidfile) ] && kill -9 `cat $(pidfile)` || true
	make clean

clean:
	rm -f server/server
	rm -f $(pidfile)

restart:
	make kill
	cd server ; go build
	./server/server -port 8080 & echo $$! > $(pidfile)

.PHONY: all serve restart kill clean
