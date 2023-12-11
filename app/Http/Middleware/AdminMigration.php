<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMigration
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // migrate admin 'guard' from web 'guard'
        $this->checkIsAdmin($request);
        // end migrate admin 'guard' from web 'guard'
        return $next($request);
    }

    protected function checkIsAdmin(Request $request)
    {
        $user       = $request->user();
        abort_unless( $user?->isAdmin(), 403);
    }

    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }
}
