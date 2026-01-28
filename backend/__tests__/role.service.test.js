import { jest } from '@jest/globals';

describe('getRoles service', () => {
    it('returns all roles', async () => {
        
        // Mock the Role model
        jest.unstable_mockModule(
            '../models/roleModel.js',
            () => ({
                default: {
                    find: jest.fn(),
                },
            })
        );

        // Import the service AFTER mocking
        const { default: Role } = await import("../models/roleModel.js");
        const { default: roleService } = await import('../services/RoleService.js');

        const mockRoles = [

            {
                name: "UI/UX Designer",
                focus: "Accessibility, Responsiveness, Design Thinking (No code)",
                questionCount: 5,
                __v: 0,
                createdAt: "2026-01-28T09:54:06.120Z",
                updatedAt: "2026-01-28T09:54:06.120Z"
            },
            {
                name: "Web Developer",
                focus: "Web fundamentals + Data Structures & Algorithms (DSA)",
                questionCount: 5,
                __v: 0,
                createdAt: "2026-01-28T09:54:06.121Z",
                updatedAt: "2026-01-28T09:54:06.121Z"
            }
        ];

        Role.find.mockResolvedValue(mockRoles);

        const roles = await roleService.getRoles();

        expect(Role.find).toHaveBeenCalledWith({});
        expect(roles).toEqual(mockRoles);
    });
});
