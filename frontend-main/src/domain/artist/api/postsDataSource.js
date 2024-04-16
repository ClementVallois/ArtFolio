// TODO: A remplacer par un appel api ensuite
const dataSourcePosts = [
    {
        "id": "f34fe354-23f5-4a22-bd17-5f6c027f4fb7",
        "is_pinned": true,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "5d043819-fa2a-4cb8-a8a2-d12b6094761a",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "89e6bb4d-3b0d-4376-b63f-3d20f33c527a",
        "is_pinned": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "5d043819-fa2a-4cb8-a8a2-d12b6094761a",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "a82095b5-e775-4c1c-b0d7-4f3f4c6bacee",
        "is_pinned": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "5d043819-fa2a-4cb8-a8a2-d12b6094761a",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "7b482f84-0a6b-4a58-9c41-c0c0beab91d4",
        "is_pinned": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "5d043819-fa2a-4cb8-a8a2-d12b6094761a",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "1b8a8193-72b3-49b4-9a7a-d3078e62860a",
        "is_pinned": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "5d043819-fa2a-4cb8-a8a2-d12b6094761a",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "c0e34dd5-7e19-48f5-ae39-94eb1db964d3",
        "is_pinned": true,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "93b20059-bc04-47a2-9e6f-74b11d9beeb9",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "3a2ed53e-99c6-46f6-8834-94e09172a2b9",
        "is_pinned": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "93b20059-bc04-47a2-9e6f-74b11d9beeb9",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "9f8375cb-5009-44e1-9100-46b535183e30",
        "is_pinned": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "93b20059-bc04-47a2-9e6f-74b11d9beeb9",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
    {
        "id": "16f37714-2c12-4e3a-a49b-6f3c2200cf46",
        "is_pinned": false,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores etperferendis eaque, exercitationem praesentium nihil.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores. ",
        "user_id": "93b20059-bc04-47a2-9e6f-74b11d9beeb9",
        "created_at": "2024-04-15T00:00:00Z",
        "updated_at": "2024-04-15T00:00:00Z",
        "deleted_at": null
    },
]

export { dataSourcePosts };
