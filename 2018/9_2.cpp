#include <iostream>

struct node {
    int value;
    node *next;
    node *previous;
};

class linked_list {
    private: 
        node *current;
    public: 
        linked_list(int value) {
            node *temp = new node();
            temp->value = value;
            temp->next = temp;
            temp->previous = temp;
            current = temp;
        };
        void next(int amount) {
            while (amount > 0) {
                current = current->next;
                amount--;
            }
        }
        void previous(int amount) {
            while (amount > 0) {
                current = current->previous;
                amount--;
            }
        }
        void insert(int value) {
            node *temp = new node();
            temp->value = value;
            temp->next = current;
            temp->previous = current->previous;

            current->previous->next = temp;
            current->previous = temp;

            current = temp;
        }

        node* remove() {
            node *temp = current;
            current->next->previous = current->previous;
            current->previous->next = current->next;
            current = current->next;

            return temp;
        }
};

void game(int players, int marbles, long* playerPoints) {
    int current = 1;
    std::fill_n(playerPoints, players, 0);
    linked_list List = linked_list(0);

    while (current <= marbles) {
        for (int i = 0; i < players; i++) {
            if (current > marbles) break;
            if (current%23==0) {
                List.previous(7);
                node *n = List.remove();
                playerPoints[i] += current + n->value;
            } else {
                List.next(2);
                List.insert(current);
            }
            current++;
        }
    }
}

int main() {
    int players = 491;
    int marbles = 71058;
    long playerPoints[players];

    std::clock_t    start;

    start = std::clock();

    game(players, marbles*100, playerPoints);

    std::cout << " high score: " << *std::max_element(playerPoints , playerPoints + players) << "\n";
    std::cout << "Time: " << (std::clock() - start) / (double)(CLOCKS_PER_SEC / 1000) << " ms" << std::endl;

}
