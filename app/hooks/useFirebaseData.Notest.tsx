import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useFirebaseData from './useFirebaseData';
import { collection, getDocs } from 'firebase/firestore';

// Mock the Firestore methods
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    collection: vi.fn(),
    getDocs: vi.fn(),
  };
});

// Mock the configFirebase module
vi.mock('../db/configFirebase', () => {
  const actual = vi.importActual('../db/configFirebase');
  return {
    ...actual,
    db: {},
  };
});

describe('useFirebaseData', () => {
  const mockPosts = [
    { id: '1', title: 'Post 1', image: 'image1.png', author: 'Author 1', desc: 'Description 1' },
    { id: '2', title: 'Post 2', image: 'image2.png', author: 'Author 2', desc: 'Description 2' },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('should fetch and set data correctly', async () => {
    // Mock implementation for getDocs
    (getDocs as any).mockResolvedValue({
      forEach: (callback: (doc: any) => void) => {
        mockPosts.forEach(post => {
          callback({
            id: post.id,
            data: () => ({
              title: post.title,
              image: post.image,
              author: post.author,
              desc: post.desc,
            }),
          });
        });
      },
    });

    const { result } = renderHook(() => useFirebaseData());

    // Wait for the hook to fetch data
    await waitFor(() => {
      expect(result.current).toEqual(mockPosts);
    });
  });

  it('should handle errors correctly', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Mock implementation for getDocs to throw an error
    (getDocs as any).mockRejectedValue(new Error('Error fetching posts'));

    const { result } = renderHook(() => useFirebaseData());

    // Wait for the hook to fetch data and handle error
    await waitFor(() => {
      expect(result.current).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching posts:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  it('should avoid duplicates', async () => {
    const mockPostsWithDuplicates = [
      ...mockPosts,
      { id: '2', title: 'Post 2', image: 'image2.png', author: 'Author 2', desc: 'Description 2' },
      { id: '3', title: 'Post 3', image: 'image3.png', author: 'Author 3', desc: 'Description 3' },
    ];

    // Mock implementation for getDocs
    (getDocs as any).mockResolvedValue({
      forEach: (callback: (doc: any) => void) => {
        mockPostsWithDuplicates.forEach(post => {
          callback({
            id: post.id,
            data: () => ({
              title: post.title,
              image: post.image,
              author: post.author,
              desc: post.desc,
            }),
          });
        });
      },
    });

    const { result } = renderHook(() => useFirebaseData());

    // Wait for the hook to fetch data
    await waitFor(() => {
      const expectedData = [
        { id: '1', title: 'Post 1', image: 'image1.png', author: 'Author 1', desc: 'Description 1' },
        { id: '2', title: 'Post 2', image: 'image2.png', author: 'Author 2', desc: 'Description 2' },
        { id: '3', title: 'Post 3', image: 'image3.png', author: 'Author 3', desc: 'Description 3' },
      ];
      expect(result.current).toEqual(expectedData);
    });
  });
});
