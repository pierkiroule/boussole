CC := gcc
CFLAGS := -std=c11 -Wall -Wextra -Wpedantic -O2
LDFLAGS :=

TARGET := deboussoles
SRC := $(wildcard src/*.c)
OBJ := $(SRC:.c=.o)

.PHONY: all clean run

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

src/%.o: src/%.c
	$(CC) $(CFLAGS) -c -o $@ $<

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET) $(OBJ)

