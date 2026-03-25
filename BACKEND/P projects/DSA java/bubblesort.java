public class bubblesort {
    public static void main(String[] args) {
        int[] numbers = { 64, 25, 12, 22, 11 };

        System.out.println("Before sorting:");
        printArray(numbers);

        bubbleSort(numbers);

        System.out.println("After sorting:");
        printArray(numbers);
    }

    // Bubble sort algorithm
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        // numbers = 22 2 45 23 4 66 1         : 7-1 = 6
        for (int i = 0; i < n - 1; i++) {
            swapped = false;

            for (int j = 0; j < n - 1 - i; j++) {          // 0,  7-1-n(0) = 6,5,4,3,2,1
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j + 1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    swapped = true;
                }
            }

            // If no two elements were swapped in inner loop, array is sorted
            if (!swapped)
                break;
        }
    }

    // Print the array
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
