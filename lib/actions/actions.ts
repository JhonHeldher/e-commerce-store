const apiUrl = process.env.NEXT_PUBLIC_API_URL;



// const products = await getProducts();

// if (products === null) {
//     return <p className="text-red-500">Erro ao carregar os produtos. Tente novamente mais tarde.</p>;
// }

// Função auxiliar para validar se a URL da API está configurada
const validateApiUrl = (): boolean => {
    if (!apiUrl) {
        console.error("Error: NEXT_PUBLIC_API_URL is not defined in environment variables.");
        return false;
    }
    return true;
};

export const getCollections = async () => {
    if (!validateApiUrl()) return null;

    try {
        const res = await fetch(`${apiUrl}/collections`, {
            cache: 'no-store' // Garante dados sempre atualizados, mude para 'force-cache' se preferir cache estático
        });

        if (!res.ok) {
            console.error(`API Error (getCollections): ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Network or parsing error in getCollections:", error);
        return null;
    }
};

export const getCollectionDetails = async (collectionId: string) => {
    if (!validateApiUrl()) return null;

    try {
        const res = await fetch(`${apiUrl}/collections/${collectionId}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`API Error (getProductDetails for ${collectionId}): ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`Network or parsing error in getCollectionDetails for ${collectionId}:`, error);
        return null;
    }
}

export const getProducts = async () => {
    if (!validateApiUrl()) return null;

    try {
        const res = await fetch(`${apiUrl}/products`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`API Error (getProducts): ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Network or parsing error in getProducts:", error);
        return null;
    }
};

export const getProductDetails = async (productId: string) => {
    if (!validateApiUrl()) return null;

    try {
        const res = await fetch(`${apiUrl}/products/${productId}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`API Error (getProductDetails for ${productId}): ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`Network or parsing error in getProductDetails for ${productId}:`, error);
        return null;
    }
};

export const getSearchedProducts = async (query: string) => {
    if (!validateApiUrl()) return null;

    try {
        const res = await fetch(`${apiUrl}/search/${query}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`API Error (getSearchedProducts for "${query}"): ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`Network or parsing error in getSearchedProducts for "${query}":`, error);
        return null;
    }
};


export const getOrders = async (customerId: string) => {
    if (!validateApiUrl()) return null;

    try {
        const res = await fetch(`${apiUrl}/orders/customers/${customerId}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`API Error (getOrders for "${customerId}"): ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`Network or parsing error in getOrders for "${customerId}":`, error);
        return null;
    }
};

export const getRelatedProducts = async (productId: string) => {
    if (!validateApiUrl()) return null;

    try {
        const res = await fetch(`${apiUrl}/products/${productId}/related`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`API Error (getRelatedProducts for "${productId}"): ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`Network or parsing error in getRelatedProducts for "${productId}":`, error);
        return null;
    }
};

